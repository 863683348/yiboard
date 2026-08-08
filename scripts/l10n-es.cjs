// 一次性脚本：把新页面翻译注入 es.json（结构安全：JSON.parse → 注入 → stringify）
const fs = require('fs');
const path = 'src/messages/es.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.nav.pricing = 'Precios';
data.footer.legal = 'Legal';
data.footer.privacy = 'Política de privacidad';
data.footer.terms = 'Términos del servicio';
data.footer.faq = 'Preguntas frecuentes';
data.footer.blog = 'Blog';
data.footer.contact = 'Contacto';

data.pricing = {
  title: 'Precios',
  sub: 'Jugar es gratis. Los planes de pago están en camino: todo es gratuito hasta que los lanzemos.',
  monthly: 'al mes',
  yearly: 'al año',
  free: { name: 'Gratis', price: '0', note: 'Jugable ahora', features: ['Gomoku contra el motor o un amigo', 'Escalera de dieciocho grados y danes', 'Historial de invitado por 180 días', 'Comparte y repasa tus partidas'] },
  plus: { name: 'Plus', price: '4.99', note: 'Para jugadores diarios', features: ['Todo lo de Gratis', 'Sin anuncios', 'Estadísticas profundas de partidas', 'Biblioteca de partidas clásicas'] },
  pro: { name: 'Pro', price: '7.99', note: 'Para jugadores serios', features: ['Todo lo de Plus', 'Acceso anticipado a Xiangqi y Go', 'Partidas guardadas ilimitadas', 'Descuento en tableros físicos'] },
  comingSoon: 'Los pagos están en integración (fase posterior). Hasta entonces, todo es gratis.',
  cta: 'Empieza gratis',
  faqTitle: 'Preguntas sobre precios',
  faqQ1: '¿Tengo que pagar ahora?',
  faqA1: 'No. Las suscripciones llegarán en una fase posterior; hasta entonces todo es gratis.',
  faqQ2: '¿Por qué un plan de pago?',
  faqA2: 'Para sostener el servicio sin anuncios ni venta de datos: servidores, el motor y la línea de tableros físicos.',
  faqQ3: '¿Puedo cancelar cuando quiera?',
  faqA3: 'Sí. Cuando lancen las suscripciones, puedes cancelar en cualquier momento y conservar el resto de tu periodo.'
};
data.privacy = {
  title: 'Política de privacidad',
  updated: 'Última actualización: agosto de 2026',
  lead: 'Recogemos lo mínimo posible. Esta política explica qué recogemos y por qué.',
  s1Title: 'Qué recogemos',
  s1Body: 'En tu primera visita escribimos un identificador anónimo de invitado (un JWT válido 180 días) para guardar tu historial y tu puntuación. No recogemos tu nombre, ubicación ni datos del dispositivo salvo que vincules un correo.',
  s2Title: 'Vincular un correo',
  s2Body: 'Es opcional y solo sirve para sincronizar tu historial entre dispositivos. Las contraseñas se guardan con hash argon2; no podemos leer tu contraseña en claro.',
  s3Title: 'Lo que no hacemos',
  s3Body: 'No vendemos tus datos, no mostramos anuncios personalizados y no te rastreamos por la web.',
  s4Title: 'Borrar tus datos',
  s4Body: 'Para eliminar tu cuenta e historial, escribe a ahmedlzany423@gmail.com y lo procesaremos en 30 días.',
  s5Title: 'Cookies',
  s5Body: 'Solo el identificador de invitado y una cookie de idioma. Sin análisis de terceros.',
  contact: 'Para preguntas de privacidad, escribe a'
};
data.terms = {
  title: 'Términos del servicio',
  updated: 'Última actualización: agosto de 2026',
  lead: 'Al usar YiBoard aceptas estos términos.',
  s1Title: 'El servicio',
  s1Body: 'YiBoard ofrece juegos de mesa en línea: Gomoku ya disponible, con Xiangqi y Go en camino. El servicio se ofrece tal cual.',
  s2Title: 'Cuentas e invitados',
  s2Body: 'Puedes jugar como invitado sin registrarte. El historial de invitado vive en tu dispositivo; vincula un correo para sincronizar.',
  s3Title: 'Juego limpio',
  s3Body: 'Prohibidos los scripts, trampas o cualquier intento de alterar los resultados. Todas las partidas entre amigos son arbitradas en el servidor; los tramposos serán rechazados y posiblemente bloqueados.',
  s4Title: 'Propiedad intelectual',
  s4Body: 'El código, diseño, textos y marca de YiBoard pertenecen al desarrollador. Tus datos de partidas te pertenecen.',
  s5Title: 'Aviso legal',
  s5Body: 'En la medida máxima permitida por la ley, YiBoard no responde por daños indirectos derivados del uso del servicio.',
  s6Title: 'Cambios',
  s6Body: 'Podemos actualizar estos términos; seguir usando el servicio tras los cambios implica aceptarlos.'
};
data.faq = {
  title: 'Preguntas frecuentes',
  sub: '¿No encuentras la respuesta? Escribe a ahmedlzany423@gmail.com.',
  q1: '¿Necesito cuenta para jugar?',
  a1: 'No. Abre el tablero y juega: tu progreso se guarda en este navegador 180 días. Vincula un correo solo cuando quieras llevarlo a otro dispositivo.',
  q2: '¿Qué nivel tiene el motor?',
  a2: 'Tres niveles: Suave (2 jugadas), Constante (4) y Afilado (6). Usa búsqueda alfa-beta con presupuesto de 500 ms, en tu navegador.',
  q3: '¿Cómo juego contra un amigo?',
  a3: 'En la página de juego elige «Contra un amigo», crea una sala y envía el código o enlace. Entran directo al tablero, sin cuenta.',
  q4: '¿Cómo funciona la escalera?',
  a4: 'Las partidas entre amigos liquidan ELO, mapeado a los dieciocho grados y danes, de Noveno Grado a Noveno Dan. Todos empiezan en 1200 (Sexto Grado). Las partidas contra el motor no mueven tu puntuación.',
  q5: '¿Cuánto dura mi historial?',
  a5: 'El de invitado dura 180 días. Con correo vinculado se conserva hasta que pidas borrarlo.',
  q6: '¿Cuándo llega la suscripción?',
  a6: 'Los pagos están en integración. Todo es gratis hasta entonces y lo anunciaremos antes de lanzar.',
  q7: '¿Hay app móvil?',
  a7: 'YiBoard es una web responsive (PWA prevista): juega en cualquier navegador móvil sin descargas.'
};
data.blog = {
  title: 'Blog',
  sub: 'Notas de desarrollo, cultura de juegos de mesa y novedades de YiBoard.',
  p1Title: 'Por qué Gomoku sale primero',
  p1Excerpt: 'Se aprende en treinta segundos y se discute desde hace tres mil años. Gomoku es el camino más corto para mostrar al mundo por qué estos juegos son buenos.',
  p1Date: 'Agosto de 2026',
  p2Title: 'De dónde viene la escalera',
  p2Excerpt: 'De Noveno Grado a Noveno Dan: por qué tomamos prestados grados y danes de la cultura china en vez de bronce y platino.',
  p2Date: 'Julio de 2026',
  p3Title: 'Árbitro en el servidor: por qué nadie puede hacer trampa',
  p3Excerpt: 'Cada jugada la valida el servidor; el cliente es solo una capa de visualización. Esa es la base de nuestro diseño anti-trampas.',
  p3Date: 'Junio de 2026'
};
data.contact = {
  title: 'Contacto',
  sub: 'Preguntas, comentarios, colaboraciones o una partida que quieras comentar: respondemos.',
  emailLabel: 'Correo',
  emailNote: 'Solemos responder en 1-2 días laborables.',
  privacyNote: 'Para borrar datos o problemas de cuenta, incluye tu ID de invitado (visible en tu perfil).'
};

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('es.json updated:', Object.keys(data).length, 'top-level keys');
