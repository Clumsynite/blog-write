import Particles from "react-tsparticles";

let style = {
  position: "absolute",
  height: "100vh",
  width: "100%",
  zIndex: "-1",
};

const TSParticles = () => {
  return (
    <div style={style}>
      <Particles
        style={{ position: "absolute" }}
        id="tsparticles"
        options={{
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#000000",
            },
            links: {
              color: "#000000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
        }}
      />
    </div>
  );
};
export default TSParticles;