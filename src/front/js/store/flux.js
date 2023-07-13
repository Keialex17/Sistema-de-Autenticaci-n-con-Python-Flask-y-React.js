const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null,
			userLoggedIn: {},
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, synching the session storage token")
				const user = localStorage.getItem('user')
				if(token && token != "" && token != undefined){
					setStore({token: token})
					setStore({userLoggedIn: user})
				} 
			},

			login: async (email, password) => {
				const store = getStore()

				const options = {

					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", options)
				if(resp.status !== 200) {
					return false;
				};
				const data = await resp.json();
				sessionStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user))
				setStore({token: data.token})
				setStore({userLoggedIn: data.user})
				return true;
				}
				catch(error){
					console.error("There has been an error login in")
				}
			},

			addNewUser: async (newUser) => {
				try {

					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						body: JSON.stringify(newUser),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const data = await resp.json();
					console.log(data);
					return true;

				} catch (error) {
					console.log(error)
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out")
				setStore({ token: null })
			},
		}
	};
};

export default getState;
