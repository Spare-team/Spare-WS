
use local;
db.createCollection("Users")

db.Users.insert(
	{userName:'Rios',
		passWord:"111",
		email:'Rios@Spare.com',
		adress:{country:'Mexico',state:'Veracruz',city:'Xalapa'},
		// No se guardan datos de ranking porque esos los alojara ranking
	}
	)

