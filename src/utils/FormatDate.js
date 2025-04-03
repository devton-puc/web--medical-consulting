const formatDate = (date) => {
    if (!date) return '';
  
    try {
      const parsedDate = createLocalDate(date);
  
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Data inválida');
      }
  
      return new Intl.DateTimeFormat('pt-BR').format(parsedDate);
    } catch (error) {
      console.error('Erro ao formatar a data:', error.message);
      return '';
    }

  };

  
  const createLocalDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  
  
  export default formatDate;
  