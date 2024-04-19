import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { Button } from "@nextui-org/react";
import GlobalContext from "../context/GlobalContext";
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  const [data, setData] = useState([]);
  const history = useNavigate();
  const objet = JSON.parse(localStorage.getItem("InfoUser"));
  const { id } = useParams();

  useEffect(() => {
    utilisateur();
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    axios
      .post(
        "http://localhost:4000/verifyAuth",
        {},
        {
          headers: {
            "access-token": objet[0],
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  setTimeout(() => {
    if (verifyAuth) {
      if (objet != null) {
        console.log("Voici notre token :", objet[0]);
      } else {
        history("/login");
      }
    }
  }, 2);

  const logout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  const utilisateur = async () => {
    try {
      const info = await axios.get(`http://localhost:4000/${id}`);
      setData(info.data);
      console.log("À PROPOS DE CE USER", info.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
    }
  };

  return (
    <header className="flex px-4 py-3 items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 fond-bold">
          Emploi du temps
        </h1>
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
        <h2 className="ml-4 text-xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <div className="flex gap-4">
        <div>
          {data.map((item, i) => {
            return (
              <div key={i} className="mt-3">
                <p className="text-sm">{item.email}</p>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            onClick={logout}
            variant="flat"
            color="primary"
            className="px-10"
          >
            Deconnecter
          </Button>
        </div>
      </div>
    </header>
  );
}
