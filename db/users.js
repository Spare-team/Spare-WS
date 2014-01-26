
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

// Un usuario puede tener n articulos marcados
db.Users.update({userName:"Rios"},
		{
			$set:{
					productosMarcados: {_id:ObjectId("52e3ee50ea74ebc31ebf4c83")}
			}
		}
	)