interface ActionBtnProps {
  icon: string;
  label: string;
  color?: 'amber' | 'red' | 'blue';
  onClick?: () => void;
}

export const ActionBtn = ({ icon, label, color = 'amber', onClick }: ActionBtnProps) => {
  const colorMap = {
    amber: 'text-amber-500 hover:bg-amber-50 hover:text-amber-600',
    red:   'text-red-400 hover:bg-red-50 hover:text-red-600',
    blue:  'text-sky-500 hover:bg-sky-50 hover:text-sky-600',
  };
  return (
    <button
      title={label}
      onClick={onClick}
      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${colorMap[color]}`}
    >
      <i className={`${icon} text-base`} />
    </button>
  );
};