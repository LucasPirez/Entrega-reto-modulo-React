const info = [
  { pregunta: 'Cual fue te video juego favorito durante tu infancia' },
  { pregunta: 'Cual fue tu deporte favorito es epoca escolar' },
  { pregunta: 'Cual fue tu serie favorita' },
  { pregunta: 'Cuales fueron la peliculas que mas te gustaron' }
]
export const sendInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(info)
    }, 200)
  })
}
