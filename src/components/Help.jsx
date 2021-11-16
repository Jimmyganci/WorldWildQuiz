import './help.css';
import { useState } from 'react';
import Modal from './modal';

const Help = () => {
  /* Modal */
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal();
  };

  const hideModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      <div className="help" aria-hidden="true" onClick={showModal}>
        {/* Button Help header */}
        <p>?</p>
      </div>
      {/* ***** Link Home ***** */}
      {window.location.href === 'http://localhost:3000/' && (
        <Modal
          openModal={openModal}
          showModal={showModal}
          hideModal={hideModal}
        >
          <div className="modalHeader">
            <p> Bienvenue au World Wild Quiz ! </p>
          </div>
          <div className="modalFullInfo">
            <p>
              Ce site a été créé par @Jimmy, @Christelle, @Patxi et @David, à
              l’occasion d’un projet, pendant notre formation à la Wild School
              de Biarritz !
            </p>
            <p>
              Lors de votre expérience, si vous souhaitez être guidé ou si vous
              avez un doute, cliquez sur cette icône et vous obtiendrez l’aide
              nécessaire !
            </p>
            <p>Bon jeu et bonne chance !</p>
          </div>
          <button className="modalBtn" type="button" onClick={hideModal}>
            Fermer
          </button>
        </Modal>
      )}
      {/* ***** Link Quiz ***** */}
      {window.location.href === 'http://localhost:3000/Quiz' && (
        <Modal
          openModal={openModal}
          showModal={showModal}
          hideModal={hideModal}
        >
          <div className="modalHeader">
            <p> Menu Quiz </p>
          </div>
          <div className="modalFullInfo">
            <p>
              Selectionnez votre Quiz parmi les choix disponibles en cliquant
              sur le jeu, puis cliquez sur l’affiche Capital ou Flag.
            </p>
            <p>
              Capital : Trouvez les capitales des pays proposés aléatoirement.
            </p>
            <p>Flag : Trouvez à quel pays correspond le drapeau.</p>
            <p>
              Dans le choix `Monde`, vous devrais choisir la difficulté AVANT de
              choisir le mode de jeu. <br /> Si votre choix se porte sur
              `Facile`, vous jouerez avec les pays les plus peuplés au monde. Si
              vous augmentez la difficulté, vous jouerez avec des pays de moins
              en moins peuplés !
            </p>
            <p>Bonne chance !</p>
          </div>
          <button className="modalBtn" type="button" onClick={hideModal}>
            Fermer
          </button>
        </Modal>
      )}
      {/* ***** Link Memory ***** */}
      {window.location.href === 'http://localhost:3000/Memory' && (
        <Modal
          openModal={openModal}
          showModal={showModal}
          hideModal={hideModal}
        >
          <div className="modalHeader">
            <p> Menu Memory </p>
          </div>
          <div className="modalFullInfo">
            <p>
              Pour accéder au jeu, il vous suffit de choisir votre difficulté et
              de cliquer sur Jouer !
            </p>
            <p> Bonne chance !</p>
          </div>
          <button className="modalBtn" type="button" onClick={hideModal}>
            Fermer
          </button>
        </Modal>
      )}
      {/* ***** Link Culture ***** */}
      {window.location.href === 'http://localhost:3000/Culture' && (
        <Modal
          openModal={openModal}
          showModal={showModal}
          hideModal={hideModal}
        >
          <div className="modalHeader">
            <p> Menu Culture </p>
          </div>
          <div className="modalFullInfo">
            <p>
              Il vous suffit de taper le nom d`un pays pour afficher son drapeau
              sous la barre de recherche.
            </p>
            <p>
              Enfin, cliquez sur le drapeau du pays pour afficher les
              informations. Vous pouvez aussi cliquer sur les drapeaux affichés,
              en parcourant la page.
            </p>
          </div>
          <button className="modalBtn" type="button" onClick={hideModal}>
            Fermer
          </button>
        </Modal>
      )}
      {/* ***** Link Classement ***** */}
      {window.location.href === 'http://localhost:3000/Classements' && (
        <Modal
          openModal={openModal}
          showModal={showModal}
          hideModal={hideModal}
        >
          <div className="modalHeader">
            <p> Menu Classement </p>
          </div>
          <div className="modalFullInfo">
            <p>AIDE Classement</p>
          </div>
          <button className="modalBtn" type="button" onClick={hideModal}>
            Fermer
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Help;
