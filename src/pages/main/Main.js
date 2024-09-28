import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Main.css'; // Importa o CSS

function Main() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');  // Redireciona para login se não houver usuário autenticado
        return;
      }

      try {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('uid', '==', user.uid));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data(); 
          setUserData(userDoc); 
        } else {
          console.error('Documento do usuário não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="container">
      <h2>Informações do Usuário</h2>
      {userData ? (
        <div>
          <p>Primeiro nome: {userData.primeiroNome}</p>
          <p>Sobrenome: {userData.sobrenome}</p>
          <p>Data de nascimento: {userData.dataNascimento}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p className="loading">Loading user data...</p>
      )}
    </div>
  );
}

export default Main;
