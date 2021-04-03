const checkPassword = (password, setPasswordErrorCheck) => {
	console.log("Check password");
	let check = false;
	//validate letter
	if (password.match(/[a-z]/)) {
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, nor: false };
		});
	} else {
		check = true;
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, nor: true };
		});
	}

	//validate capital letter
	if (password.match(/[A-Z]/)) {
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, cap: false };
		});
	} else {
		check = true;
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, cap: true };
		});
	}

	//validate special character
	if (password.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, spe: false };
		});
	} else {
		check = true;
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, spe: true };
		});
	}

	//validate number
	if (password.match(/\d/)) {
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, num: false };
		});
	} else {
		check = true;
		setPasswordErrorCheck((passwordErrorCheck) => {
			return { ...passwordErrorCheck, num: true };
		});
	}
	// console.log(passwordErrorCheck);
	return !check;
};

export default checkPassword;
