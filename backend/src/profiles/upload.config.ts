import { diskStorage } from 'multer';
import { extname } from 'path';

export const photoStorage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, uniqueName + ext);
    },
  }),
};
