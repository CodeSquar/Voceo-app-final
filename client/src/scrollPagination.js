import React, { useState, useEffect } from 'react';

export function useScrollPagination(page, setPage, loading) {
  const [reachedEndOfPage, setReachedEndOfPage] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!loading) {
        // Altura total del documento
        setReachedEndOfPage(false);
        const documentHeight = document.documentElement.scrollHeight;

        // Altura visible del documento
        const visibleHeight = window.innerHeight;

        // Posición actual del scroll
        const scrollPosition = window.scrollY;

        // Distancia antes del final de la página
        const offset = 1;

        // Si se ha llegado a 200px antes del final de la página y no se ha alcanzado el final de la página
        if (documentHeight - visibleHeight - scrollPosition < offset && !reachedEndOfPage) {
          // Establecer reachedEndOfPage a true para evitar que se incremente page más de una vez
          setReachedEndOfPage(true);
          setPage(page + 1);
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    // Reiniciar reachedEndOfPage cuando cambia la página
    setReachedEndOfPage(false);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, loading, setPage]);

}