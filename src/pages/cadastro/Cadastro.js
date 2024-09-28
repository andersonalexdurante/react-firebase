import React, { useState } from 'react';
import { auth, db } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Importando o CSS

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError(''); // Limpar qualquer erro anterior
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuário criado com sucesso: ", user);

      // Salvando dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        primeiroNome,
        sobrenome,
        dataNascimento,
        uid: user.uid // Corrigir de user.id para user.uid
      });
      console.log("Dados do usuário salvos no Firestore");

      navigate('/main');
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Cadastro</h2>
      <input type="text" placeholder="Nome" value={primeiroNome} onChange={(e) => setPrimeiroNome(e.target.value)} />
      <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="date" placeholder="Data de Nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
      <button onClick={handleSignUp}>Cadastrar</button>
      {error && <p className="error">{error}</p>}
      <p>Já tem uma conta? <span onClick={() => navigate('/')} className="link">Login</span></p>
    </div>
  );
}

export default Cadastro;
