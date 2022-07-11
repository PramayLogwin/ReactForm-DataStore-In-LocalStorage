import React, { useEffect, useState } from 'react'

export default function Form() {

    const getData = () => {
        
        let userData = localStorage.getItem('data');
        if (userData) {
            return (JSON.parse(userData));
        } else {
            return []
        }
    }
    const [data, setData] = useState(getData());
    const [firstname, setFirstname] = useState('');
    const [LastName, setLastName] = useState('');

    const [id, setId] = useState(null);
    const [changebtn, setchangebtn] = useState(true);
  

    const addData = (e) => {
        e.preventDefault();
        if (firstname === "" || LastName === "") {
            alert("Pls Insert Data First..")
        } else if (id) {
            let obj = {
                id: id,
                firstname,
                LastName,
            }
            setData(data.map((item) => {
                if (item.id === id) {
                    return obj
                }
                return item;
            }))
            setchangebtn(true);
            setId(null);

        } else {

            let formdata = {
                id: Date.now(),
                firstname,
                LastName,            
              
            }
            setData([...data, formdata]);
        }
        setFirstname('');
        setLastName('');
     
    }
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
    }, [data]);



    const removebtn = (id) => {

        setData((userDetails) => {
            return userDetails.filter((data) => {
                return data.id !== id
            })
        })
    }

    
    const updatebtn = (e, id) => {
        e.preventDefault()
        data.map(item => {
            if (item.id === id) {
                setFirstname(item.firstname);
                setLastName(item.LastName);
                
            }
        });
        setchangebtn(false);
        setId(id)
        console.log("Clicked")
    }


    return (
        <>
            <h1>Login form</h1>
            <form>
                <div id="login-box">
                    <div className="left">
                        <h1>Sign up</h1>
                        <input type="text" name="FirstnameS" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
                        <input type="text" name="LastnameS" placeholder="Lastname" onChange={(e) => setLastName(e.target.value)} value={LastName} />
                        {
                            changebtn ? <button className='Submitbtn' onClick={addData}>Submit</button> :
                                <button className='Submitbtn' onClick={addData}>Edit</button>
                        }

                    </div>
                </div>

                <div className='detailsform'>
                    <table>
                        <thead>
                            <tr>
                                <td>FirstName</td>
                                <td>LastName</td>
                                <td>Remove</td>
                                <td>Update</td>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(data => {
                                return (

                                    <tr key={data.id}>
                                        <td>{data.firstname}</td>
                                        <td>{data.LastName}</td>
                                        <td><button onClick={() => removebtn(data.id)}>Remove</button></td>
                                        <td><button onClick={(e) => updatebtn(e, data.id)}> Update</button></td>

                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    )
}
