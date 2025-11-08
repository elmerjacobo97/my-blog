# Imagen Open Graph (og-image.png)

## ⚠️ ACCIÓN REQUERIDA

Necesitas crear una imagen `og-image.png` en la carpeta `/public/` con las siguientes especificaciones:

### Especificaciones de la imagen:
- **Tamaño:** 1200 x 630 píxeles
- **Formato:** PNG o JPG
- **Ubicación:** `/public/og-image.png`

### Contenido sugerido:
- Título: "Blog - Elmer Jacobo"
- Subtítulo: "React Native & Desarrollo Web"
- Tu logo o foto (opcional)
- Colores de tu marca
- Fondo atractivo y profesional

### Herramientas para crear la imagen:
1. **Canva** (fácil, con plantillas): https://www.canva.com/
   - Busca "Open Graph" o "Social Media" templates
   - Dimensiones personalizadas: 1200 x 630

2. **Figma** (más profesional): https://www.figma.com/
   - Frame de 1200 x 630
   - Exporta como PNG

3. **Next.js OG Image Generation** (automático):
   - Crea `/app/opengraph-image.tsx` para generar dinámicamente
   - Documentación: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

### Ejemplo con código (opción avanzada):

Si prefieres generar la imagen automáticamente con Next.js, crea este archivo:

**`/app/opengraph-image.tsx`:**
```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog - Elmer Jacobo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e40af, #7c3aed)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}
        >
          Blog - Elmer Jacobo
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#e0e7ff',
          }}
        >
          React Native & Desarrollo Web
        </div>
      </div>
    ),
    { ...size }
  );
}
```

### Verificar que funciona:
Después de crear la imagen, verifica que se muestra correctamente compartiendo tu blog en:
- Twitter
- Facebook
- LinkedIn
- WhatsApp

Usa herramientas de testing:
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

**NOTA:** Mientras tanto, las referencias a `og-image.png` en el código no causarán errores, pero la imagen no se mostrará al compartir enlaces en redes sociales hasta que la crees.
