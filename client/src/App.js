import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/members");
        setMembers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMembers();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/members", { name });
      setRefresh(!refresh);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Argonaute has been saved",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/members/${id}`);
      setRefresh(!refresh);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Argonaute has been deleted!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="App">
      <header>
        <h1>
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
          />
          Les Argonautes
        </h1>
      </header>

      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <form class="new-member-form" onSubmit={(e) => handleSubmit(e)}>
          <label for="name">Nom de l&apos;Argonaute</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Charalampos"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Envoyer</button>
        </form>
        <h2>Membres de l'équipage</h2>
        <section class="member-list">
          {members.map((member) => (
            <div key={member.id} className="member-item">
              {member.name}
              <button
                type="button"
                className="btn-delete"
                onClick={() => handleDelete(member.id)}
              >
                X
              </button>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;
