import React, { useEffect, useState } from "react";
import Create from "./create";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Show = () => {
  const [auth,setAuth] = useAuth();
  const [title, setTitle] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState([]);


  let uploader = user.map((u)=>u)

  console.log(uploader)
  // console.log(message)
  // console.log(user)

  const getAllUser = async () => {
    const { data } = await axios.get("http://localhost:5000/auth/get");
    if (data) {
      setUser(data.user);
      // set(data.user);
    }

    // console.log(data);
  };

  useEffect(() => {
    getAllUser();
  }, []);



  const getAllPosts = async () => {
    const { data } = await axios.get("http://localhost:5000/status/get");
    if (data) {
      setMessage(data.text);
    }

    // console.log(data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // ---------------------------------------------------------------- creating post

  const create = async (e) => {
    e.preventDefault();
    const user = auth.user._id;
    const name = auth.user.name;

    const { data } = await axios.post(
      "http://localhost:5000/status/post",
      { title, user,name },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      }
    );
    if (data) {
      // console.log(data);
      alert(data.message);
      getAllPosts();
    }
  };

  const onAlert = () => {
    alert("login first");
  };

  // ---------------------------------------------------------------- editing post

  const editHandler = async(_id) => {
     
    const {data} = await axios.put(`http://localhost:5000/status/edit/${_id}`,{title},{
      headers: {
        Authorization: JSON.parse(localStorage.getItem("userID")).token,
      },
    })
    if(data){
      alert(data.message)
      setEditModal(false)
      // setMessage(data.text);
      getAllPosts();
    }
    console.log(_id);
  };

  // ---------------------------------------------------------------- deleting post

  const deleteHandler = async(_id) => {
     
      await axios.delete(`http://localhost:5000/status/delete/${_id}`,{
      headers: {
        Authorization: JSON.parse(localStorage.getItem("userID")).token,
      },
    })
    alert("status deleted");
    getAllPosts();
    
    // console.log(_id);
  };



  // let name = localStorage.getItem("userID") ? auth.user.name :auth.user
  return (
    <div className="post" >
      <Create
      message={message}
        title={title}
        setTitle={setTitle}
        create={create}
        onAlert={onAlert}
      />
       <br /> <br />
      <div
        style={{
          width: "350px",
          height: "fit-content",
          border: "1px solid black",
          margin: "auto",
        }}
      >  
      <h2 style={{textAlign:"center"}}> All posts</h2>
        {" "}
        {message.map((m) => {
          return (
            <div  key={m._id} style={{textAlign:"center",height:"fit-content",borderBottom: "1px solid black",padding:"1rem",gap:"10px"}}>
              
              <p>
                {" "}
                post by <b> {m.name} </b>{" "}
              </p>
              <h1>{m.title}</h1>
              <br /> <br />
              {auth.token !== "" && (
                <>
                { auth.user._id === m.user ? (<>
              
              {editModal === false ? <button onClick={() => setEditModal(true) }>edit</button> : null }
              {
                editModal && (
                  <div style={{ display:"flex",flexDirection:"column",gap:"10px"}}>
                  <input required="true" type="text" placeholder="edit your title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                  <button onClick={()=> editHandler(m._id)}>submit</button>
                  <button onClick={()=> setEditModal(false)}>cancel</button>
                  </div> 
                )
              } <br />
              <button onClick={() => deleteHandler(m._id)}>
                delete
              </button>{" "}
              <br />
          </>):(null)}
                </>
              )}
              
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Show;
