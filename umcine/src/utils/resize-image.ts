// 고른 이미지를 가운데 기준 정사각형으로 자르고 줄여서 data URL로 돌려줌
// 원본을 그대로 localStorage에 넣으면 용량 한도(약 5MB)를 넘길 수 있어서 줄여서 저장함
export function resizeImageToDataUrl(file: File, size = 160): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("이미지를 처리할 수 없어요."));
        return;
      }

      // 짧은 변을 기준으로 가운데를 잘라 원형 프로필에 맞춤
      const cropSize = Math.min(image.width, image.height);
      const sx = (image.width - cropSize) / 2;
      const sy = (image.height - cropSize) / 2;
      context.drawImage(image, sx, sy, cropSize, cropSize, 0, 0, size, size);

      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("이미지를 불러올 수 없어요."));
    };

    image.src = objectUrl;
  });
}
