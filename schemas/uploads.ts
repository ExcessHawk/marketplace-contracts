import { z } from 'zod';

/**
 * Imágenes de producto.
 *
 * La subida viaja como multipart, así que no hay esquema de cuerpo que
 * compartir: lo que los dos lados necesitan acordar es la respuesta y las
 * reglas, para que el frontend rechace un archivo antes de gastar la subida.
 */

export const UPLOAD_MAX_BYTES = 2 * 1024 * 1024;

/** Lo que el navegador puede ofrecer en el selector de archivos. */
export const UPLOAD_ACCEPT = 'image/jpeg,image/png,image/webp';

export const UploadedFileSchema = z.object({
  /** Nombre del archivo guardado. Es lo que se persiste en `imageKeys`. */
  key: z.string(),
  /** Ruta servible, del mismo origen que la API. Va directo en un `src`. */
  url: z.string(),
  bytes: z.number().int().positive(),
  contentType: z.string(),
});

export type UploadedFile = z.infer<typeof UploadedFileSchema>;
