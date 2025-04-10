import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/Auth.interface';
import styles from './Login.module.css';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};
	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				console.log(e);
				setError(e.response?.data.message);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш email</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
					/>
				</div>
				<Button appearence="big">Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<a href="/auth/register">Зарегистрироваться</a>
			</div>
		</div>
	);
}
