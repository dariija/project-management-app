export default function createRootContainer(id: string) {
  const rootContainer = document.createElement('div');
  rootContainer.id = id;
  return rootContainer;
}
