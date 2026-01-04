/**
 * StatsCards component displaying summary statistics
 */

export default function StatsCards({ stats }) {
  const cards = [
    {
      label: 'Total Projects',
      value: stats.total,
      icon: '📁',
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Processing',
      value: stats.processing,
      icon: '⏳',
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-yellow-600',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: '✅',
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
    },
    {
      label: 'Payments Pending',
      value: stats.pendingPayments,
      icon: '💳',
      color: 'red',
      bgGradient: 'from-red-500 to-red-600',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.bgGradient} flex items-center justify-center text-2xl`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

