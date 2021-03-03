import React, {useState, useEffect} from 'react'
import { useFirebaseApp, useUser } from 'reactfire'
import SignOut from './SignOut'

const Profile = (props) => {

  const [username, setUserName] = useState('');
  const [nickname, setNickName] = useState('');
  const [favoriteDay, setFavoriteDay] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('');
  const [favoriteHour, setFavoriteHour] = useState('');
  const [parentsEmail, setParentsEmail] = useState('');
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('');

  const firebase = useFirebaseApp();
  const user = useUser();
  const db = firebase.database();

  const writeInfo = () => {
      db.ref(user.data.uid + '/info/').set({
        nick: nickname,
        name: username,
        color:favoriteColor,
        animal:favoriteAnimal,
        dayPreference : favoriteDay,
        hourPreference: favoriteHour
      });
  }

  useEffect(()=>{
    const ref = db.ref().child(user.data.uid).child('info');
    ref.on(
      'value',(snapshot) => {
        let snap = snapshot.val();
        console.log(snap);
        setUserName(snap.name);
        setNickName(snap.nick);
        setFavoriteColor(snap.color);
        setFavoriteDay(snap.dayPreference);
        setFavoriteAnimal(snap.animal);
        setParentsEmail(snap.emailParents);
        setSchool(snap.institution);
        setLevel(snap.year);
      }
    );
  },[]);

  return(
    <div className="card selectCard profileCard" style={{width: "30rem"}}>
      <div className="card-body">
        <h5 className="card-title">Mi perfil</h5>
        <hr />
        <div className="text-spaced-6">
          <p className="card-text">Actualiza tu datos</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg" className="img-profile"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Hombre_Palito.png" className="img-myself"/>
        </div>
        <form>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Cómo me gusta que me digan</label>
            <input type="text" className="input-card" value={nickname} required onChange={e => setNickName(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Mi nombre completo</label>
            <input type="text" className="input-card" value={username} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Correo de mi responsable</label>
            <input type="text" className="input-card" value={parentsEmail} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Mi grado</label>
            <input type="text" className="input-card" value={level} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Mi colegio</label>
            <input type="text" className="input-card" value={school} disabled/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Día favorito</label>
            <input type="text" className="input-card" value={favoriteDay} required onChange={e => setFavoriteDay(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">El animal que más me gusta</label>
            <input type="text" className="input-card" value={favoriteAnimal} required onChange={e => setFavoriteAnimal(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-1">Color que más me gusta</label>
            <input type="text" className="input-card"  value={favoriteColor} required onChange={e => setFavoriteColor(e.target.value)}/>
          </div>
          <div style={{display:"block"}}>
            <label className="text-spaced-3">Momento  preferido del día</label>
            <input type="time" className="input-card" value={favoriteHour} required onChange={e => setFavoriteHour(e.target.value)}/>
          </div>
        </form>
        <button  className="buttonSubmit" onClick={writeInfo}>¡Actualizate!</button>
        <button  className="buttonSubmit" onClick={()=>props.onReturnToMap(false)}>Regresar al mapa</button>
        <SignOut />
      </div>
    </div>
  );
}

export default Profile;
