
export const categories = [
  { id: 'work', label: 'Trabalho', color: 'bg-purple-500' },
  { id: 'personal', label: 'Pessoal', color: 'bg-blue-500' },
  { id: 'health', label: 'Saúde', color: 'bg-green-500' },
  { id: 'study', label: 'Estudos', color: 'bg-amber-500' },
  { id: 'social', label: 'Social', color: 'bg-pink-500' },
];

export const getCategoryById = (categoryId: string) => {
  return categories.find(category => category.id === categoryId);
};
