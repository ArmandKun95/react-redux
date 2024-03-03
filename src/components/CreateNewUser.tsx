import { Badge, Button, Card, TextInput, Title } from '@tremor/react';
import { useState } from 'react';
import { useUserActions } from '../hooks/useUserActions';

function CreateNewUser() {
    const {addUser} = useUserActions()
    const [result, setResult] = useState < "ok" | "ko" | null > (null)

    const handleSubmit = (event: React.FormEvent<HTMLFormEvent>) => {
        event.preventDefault()

        setResult(null)

        const form = event.target
        const formData = new FormData(form)

        const name = formData.get("name") as string
        const email = formData.get("email") as string;
        const github = formData.get("github") as string;

        if (!name || !email || !github) {
            return setResult("ko")
        }

        addUser({name, email, github})
        setResult("ok")
        form.reset()
    }

  return (
			<Card style={{ marginTop: "16px" }}>
				<Title>Create New User</Title>

				<form onSubmit={handleSubmit} className="">
					<TextInput name="name" placeholder="Name" />
					<TextInput name="email" placeholder="Email" />
					<TextInput name="github" placeholder="Github User" />

					<div>
						<Button type="submit" style={{ marginTop: "16px" }}>
							Create User
						</Button>
						<span>
							{result === "ok" && (
								<Badge color="green">Guardado Exitosamente</Badge>
							)}
							{result === "ko" && (
								<Badge color="red">Rellena todos los campos</Badge>
							)}
						</span>
					</div>
				</form>
			</Card>
		);
}

export default CreateNewUser