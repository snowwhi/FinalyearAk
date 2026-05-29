import type { Request, Response } from 'express';
import axios from 'axios';

export const getTigerCounseling = async (req: Request, res: Response) => {
    try {
        const { query, studentData } = req.body;
        
        // DEBUG: See what the backend is actually receiving
        console.log("DEBUG: studentData received:", typeof studentData, studentData);

        // Extract the array regardless of how it's wrapped
        let resultsArray: any[] = [];
        
        if (Array.isArray(studentData)) {
            resultsArray = studentData;
        } else if (studentData && typeof studentData === 'object') {
            // Check common keys your RMS might use
            resultsArray = studentData.semesters || studentData.results || studentData.data || [];
        }

        if (resultsArray.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No transcript records found in the provided data." 
            });
        }

        // 1. Format the academic results for Tiger
        const formattedResults = resultsArray.map((res: any) => 
            `${res.subject_name || 'Subject'}: ${res.grade || 'N/A'}`
        ).join(', ');

        // 2. Call the Python Engine
        const response = await axios.post('http://127.0.0.1:8000/ai/consult', {
            query: query,
            results: formattedResults
        });

        res.status(200).json({ success: true, advice: response.data.answer });

    } catch (error: any) {
        console.error("Tiger Bridge Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};