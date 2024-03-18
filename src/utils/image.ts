function createImage(src: string) {
  const image = new Image();
  image.src = src;

  return image;
}

export { createImage };
