export function dataFormat(dataISO) {
  const [ano, mes, dia] = dataISO.split('T')[0].split('-');

  const hoje = new Date();
  const hojeStr = hoje.toISOString().split('T')[0];
  const [hojeAno, hojeMes, hojeDia] = hojeStr.split('-');

  const dataFormatada = new Date(ano, mes - 1, dia);
  const hojeFormatada = new Date(hojeAno, hojeMes - 1, hojeDia);

  const diffMs = hojeFormatada - dataFormatada;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) return 'Hoje';
  if (diffDias === 1) return 'Ontem';
  if (diffDias <= 7) return `${diffDias} dias atrás`;

  const mesmoAno = ano === hojeAno;

  const opcoes = {
    day: 'numeric',
    month: 'long',
    ...(mesmoAno ? {} : { year: 'numeric' })
  };

  return new Intl.DateTimeFormat('pt-BR', opcoes).format(dataFormatada);
}
