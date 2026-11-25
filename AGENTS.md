# JONY CLIP RD — reglas de desarrollo

## Prioridad: evolución sin regresiones
- Conservar todas las funciones, herramientas, pantallas y opciones existentes. Las mejoras deben ser aditivas; nunca sustituir el estudio profesional por un prototipo.
- Mantener visibles y accesibles los modos existentes. Si se introduce un modo nuevo, ofrecerlo como opción independiente, conservando el flujo anterior.
- No eliminar carpetas, proyectos, clips, configuraciones ni datos del usuario. No cambiar contratos de API, formatos de almacenamiento ni rutas existentes de manera incompatible.
- Cualquier eliminación, sustitución o migración incompatible requiere autorización explícita del propietario. Las correcciones de seguridad no deben desactivar funciones sin explicar el motivo y proponer alternativas.
- No activar nuevas APIs de pago, planes ni procesamiento costoso sin autorización; informar de costes y límites. Conservar protecciones del servidor.
- Antes de integrar cambios: revisar el diff, compilar, ejecutar pruebas relevantes y comprobar los flujos anteriores además del nuevo. No declarar una función operativa si no se ha probado.
- Separar funciones experimentales de las profesionales; indicar las limitaciones reales y no simular resultados inexistentes.

## Funciones a preservar
- Estudio profesional: generación por enlace y por archivo, cantidad/duración, estilos de subtítulos (Hormozi, MrBeast, Neón, Caja CapCut, Minimalista y sin subtítulos), colores, emojis, edición, reproducción y descarga.
- Carpetas y proyectos existentes; navegación a Crear, Estudio, Carpetas, Dramas IA, Mis Redes y Planes.
- Directo automático con vista previa del título, canal y miniatura, acceso como invitado, estado de captura, galería y descarga.
- Recorte local experimental de archivos, separado del estudio profesional.

Esta lista es un mínimo de conservación, no un inventario exhaustivo ni una afirmación de que todas las funciones estén verificadas de extremo a extremo.
