import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import '../assets/css/App.css';
import Header from '../components/header'

function Home() {

    const [user, setUser] = useState(null);

  useEffect(()=>{
    const userData = localStorage.getItem('user');
    if (userData){
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert('¡Adiós! Esperamos verte pronto')
  };

  return (
    <>
        <Header/>
      <section id="hero">
        <h1>Cine Apolo</h1>
      </section>

      <section id="somosApolo">
        <div className="container">
          <h2>Somos <span className="color-acento">Apolo</span></h2>
          <p>
            El Cine Apolo abrió sus puertas en 1950, en una época en la que las películas se proyectaban en blanco y negro y el cine era la principal fuente de entretenimiento.
            Fundado por Don Carlos Herrera, un amante del cine, el Cine Apolo se convirtió rápidamente en un refugio cultural. Con el paso del tiempo, a pesar de los cambios tecnológicos,
            el Cine Apolo ha mantenido su esencia: ser un lugar donde las historias cobran vida y los sueños se proyectan en la gran pantalla. Hoy, sigue siendo un pilar de la comunidad, uniendo generaciones a través del poder del cine.
          </p>
          <h2><span className="color-acento">Misión</span></h2>
          <p>Promover la cultura y el entretenimiento a través del cine, brindando a nuestros espectadores una programación diversa y de alta calidad, en un ambiente acogedor y accesible, que fomente la unión y el disfrute de la comunidad.</p>
          <h2><span className="color-acento">Visión</span></h2>
          <p>Ser el cine de referencia en la ciudad, reconocido por ofrecer una experiencia cinematográfica inigualable que combine la magia del cine clásico con las innovaciones tecnológicas actuales, creando recuerdos inolvidables para todas las generaciones.</p>
        </div>
      </section>

      <section id="demostracion">
        <div className="container">
          <h2>Cartelera</h2>
          <div className="cart-container">
            <div className="carta">
                <RouterLink to="/reserva" className='router_link'>
                    <h3>El Susurro de las Sombras</h3>
                    <p>
                        Sinopsis: En un pequeño pueblo, un antiguo manicomio abandonado es el centro de leyendas oscuras. Un grupo de amigos, atraídos por la curiosidad, decide explorar el lugar. 
                        Lo que descubren dentro supera sus peores pesadillas: presencias oscuras y siniestras acechan en los pasillos. 
                        A medida que la noche avanza, uno a uno enfrentan sus miedos más profundos, y pronto se dan cuenta de que el verdadero horror es más real de lo que jamás imaginaron. La supervivencia dependerá de descubrir la verdad oculta en las sombras.
                    </p>
              </RouterLink>
            </div>
            <div className="carta">
                <RouterLink to="/reserva" className='router_link'>
                    <h3>Aventuras en el Bosque Encantado</h3>
                    <p>
                        Sinopsis: En un mundo mágico, un grupo de animales del bosque descubre que su hogar está en peligro debido a la creciente deforestación. 
                        Liderados por un valiente conejito llamado Max, deciden embarcarse en una aventura para encontrar el Mágico Árbol de la Vida, que se dice tiene el poder de restaurar el equilibrio natural. 
                        En su camino, se encuentran con personajes entrañables y enfrentan desafíos emocionantes. Juntos, aprenderán sobre la importancia de la amistad, el trabajo en equipo y la protección de la naturaleza.
                    </p>
                </RouterLink>
            </div>
            <div className="carta">
                <RouterLink to="/reserva" className='router_link'>
                    <h3>La Última Estrella</h3>
                    <p>
                        Sinopsis: En un futuro lejano, la humanidad ha colonizado varios planetas, pero enfrenta una crisis energética sin precedentes. 
                        Una astrónoma brillante, la Dra. Elena Vargas, descubre una estrella misteriosa que podría ser la clave para la supervivencia. 
                        Lidera una misión espacial para investigar, pero lo que encuentran desafía todas las leyes conocidas de la física. Mientras desentrañan los secretos de la estrella, la tripulación se enfrenta a dilemas éticos y peligros desconocidos. 
                        La búsqueda de respuestas podría cambiar el destino de la humanidad para siempre.
                    </p>
               </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <section id="final">
        <h2>¿Listo para una peli?</h2>
      </section>

      <footer>
        <div className="container">
          <p>&copy; Cine Apolo 2024</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
