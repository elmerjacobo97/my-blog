'use client';

import Giscus from '@giscus/react';

export function Comments() {
  return (
    <div className="mt-12">
      <Giscus
        repo="elmerjacobo97/blog-comments"
        repoId="R_kgDOQRg-3w"
        category="Blog Comments"
        categoryId="DIC_kwDOQRg-384CxkAJ"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="es"
        loading="lazy"
      />
    </div>
  );
}
