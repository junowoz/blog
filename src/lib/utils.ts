export function formatDate(date: string) {
	const [year, month, day] = date.split('-');
	const months = [
	  'Jan', 'Fev', 'Mar', 'Abr',
	  'Mai', 'Jun', 'Jul', 'Ago',
	  'Set', 'Out', 'Nov', 'Dez'
	];
	return `${Number(day)} de ${months[Number(month) - 1]}. ${year}`;
  }