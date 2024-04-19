import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Tabs,
  Tab,
  Link,
  Card,
  CardBody,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeFilledIcon } from "../Icons/EyesFilled";
import { EyeSlashFilledIcon } from "../Icons/EyesFlash";
function Identifiant() {
  const [input, setInput] = useState([]);
  const naviagate = useNavigate();
  const [selected, setSelected] = React.useState("login");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
      if (name === "password" && value.length < 8) {
        // Afficher une erreur ou effectuer une action appropriée
        // Par exemple, définir un état pour indiquer que le mot de passe est invalide
        
        console.log("Le mot de passe doit contenir au moins 8 caractères");
        // Vous pouvez également afficher un message d'erreur à l'utilisateur si nécessaire
      }
    setInput((values) => ({ ...values, [name]: value }));
  };
  const Inscrire = async (e) => {
    e.preventDefault();

    // Vérifier si les champs requis sont vides
    if (!input.im || !input.nom || !input.email || !input.password) {
      // Afficher une notification d'erreur si des champs sont vides
      toast.error("Veuillez remplir tous les champs", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Arrêter la soumission du formulaire si des champs sont vides
    }
    // Vérifier la longueur du mot de passe
    if (input.password.length < 8) {
      // Afficher une notification d'erreur si le mot de passe est trop court
      toast.error("Le mot de passe doit contenir au moins 8 caractères", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Arrêter la soumission du formulaire si le mot de passe est trop court
    }

    // Tous les champs sont remplis, procéder à l'inscription
    await axios
      .post("http://localhost:4000/inscrire", input)
      .then(function (response, err) {
        if (response) {
          console.log("Tout va bien");
          toast.success("Inscription avec succès", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSelected("login");
        } else {
          console.log(err);
        }

        console.log(input);
      });
  };

  const Login = async (e) => {
    e.preventDefault();

    // Vérifier si les champs email et password sont vides
    if (!input.email || !input.password) {
      // Afficher une notification d'erreur si des champs sont vides
      toast.error("Veuillez remplir tous les champs", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Arrêter la soumission du formulaire si des champs sont vides
    }

    // Les champs email et password sont remplis, continuer avec la connexion
    try {
      const response = await axios.post("http://localhost:4000/login", input);
      if (response.data.result === "Connexion réussie") {
        const objet = [response.data.token, response.data.id];
        localStorage.setItem("InfoUser", JSON.stringify(objet));
        if (response.data.token) {
          console.log(input.email);
          console.log(response.data.token);
          naviagate(`/dashboard/${response.data.id}`);
        }
      } else {
        console.log("Email ou mot de passe invalide");
      }
    } catch (error) {
      console.log("Erreur lors de la connexion", error);
    }
  };

  return (
    <>
      <div className="flex flex-col  justify-center items-center">
        <Card className="max-w-full w-[440px] h-[500px] mt-4">
          <CardBody className="overflow-hidden py-5">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Se connecter">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    isClearable
                    label="Email"
                    placeholder="Entrer votre email"
                    type="email"
                    name="email"
                    onChange={change}
                    onClear={() => console.log("input cleared")}
                    className="focus:outline-none"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="mot de passe 8 caracteres minimum"
                    name="password"
                    onChange={change}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                  <p className="text-center text-small">
                    Besoin de creer un compte?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("sign-up")}
                      className="cursor-pointer"
                    >
                      S'inscrire
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" onClick={Login}>
                      Se connecter
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="S'inscrire">
                <form
                  action=""
                  onSubmit={Inscrire}
                  className="flex flex-col gap-4 h-[300px]"
                >
                  <Input
                    isClearable
                    isRequired
                    label="Immatricule"
                    placeholder="Entrer votre numero matricule "
                    type="text"
                    name="im"
                    onChange={change}
                    onClear={() => console.log("input cleared")}
                  />
                  <Input
                    isRequired
                    isClearable
                    label="Nome complet"
                    placeholder="Entrer votre nom complet"
                    type="text"
                    name="nom"
                    onChange={change}
                    onClear={() => console.log("input cleared")}
                  />
                  <Input
                    isRequired
                    isClearable
                    label="Email"
                    name="email"
                    onChange={change}
                    placeholder="Entrer votre email"
                    type="email"
                    onClear={() => console.log("input cleared")}
                  />
                  <Input
                    isRequired
                    label="Mot de passe"
                    name="password"
                    onChange={change}
                    placeholder="Mot de passe 8 caractères minimum"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                  <p className="text-center text-small">
                    Deja un compte?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("login")}
                      className="cursor-pointer"
                    >
                      Se connecter
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" onClick={Inscrire}>
                      S'inscrire
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
        <ToastContainer />
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Identifiant;
