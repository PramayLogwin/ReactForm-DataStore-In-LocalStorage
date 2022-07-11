import React, { useEffect, useState } from 'react';


export default function FormWithLs() {
    const getData = () => {
        const userData = localStorage.getItem('data');
        if (userData) {
            return (JSON.parse(userData));
        } else {
            return []
        }
    }

    const [data, setData] = useState(getData());

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [education, setEducation] = useState('');
    const [bod, setBod] = useState('');
    const [gender, setGender] = useState('');


    const [id, setId] = useState(null);
    const [tooglebtn, settooglebtn] = useState(true);

    const addData = (e) => {
        e.preventDefault();
        if (firstname === "" || lastname === "" || email === "") {
            alert("Pls Insert Data First..")
        } else if (id) {
            let obj = {
                id: id,
                firstname,
                lastname,
                email,
                education,
                bod,
                gender,
            }
            setData(data.map((item) => {
                if (item.id === id) {
                    return obj
                }
                return item;
            }))
            settooglebtn(true);
            setId(null);

        } else {

            let formdata = {
                id: Date.now(),
                firstname,
                lastname,
                email,
                education,
                bod,
                gender,
            }

            setData([...data, formdata]);

        }
        setFirstname('');
        setLastname('');
        setEmail('');
        setEducation('');
        setBod('');
        setGender('');
    }
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
    }, [data]);


    const deleteData = (id) => {
        setData((text) => {
            return text.filter((data) => {
                return (data.id !== id)
            })
        })
    }

    const updateData = (id) => {
        data.map(item => {
            if (item.id === id) {
                setFirstname(item.firstname);
                setLastname(item.lastname);
                setEmail(item.email);
                setEducation(item.education);
                setBod(item.bod);
                setGender(item.gender);
            }
        });
        settooglebtn(false);
        setId(id)
    }



    return (
        <>
            <h1>Form Date Store In Local Storage</h1>
            <form>
                <div id="login-box">
                    <div className="left">
                        <h1>Sign up</h1>
                        <input type="text" name="FirstnameS" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
                        <input type="text" name="LastnameS" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} value={lastname} />
                        <input type="text" name="emailS" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} />

                        <label>Education : </label>
                        <div className='education'>
                            <select name="education" onChange={(e) => setEducation(e.target.value)} value={education}>
                                <option value="Course">Course</option>
                                <option value="BCA">BCA</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="MCA">MCA</option>
                                <option value="M.Tech">M.Tech</option>
                            </select>
                        </div><br />
                        <label>Birth Of Date : </label>
                        <input type="date" name="bod" onChange={(e) => setBod(e.target.value)} value={bod} />
                        <br />
                        <br />

                        <label>Gender : </label>
                        <input type="radio" name="gender" onChange={(e) => setGender(e.target.value)} value="Male" checked={gender === "Male"} ></input>
                        <label> Male</label>
                        <input type="radio" name="gender" onChange={(e) => setGender(e.target.value)} value="Female" checked={gender === "Female"} ></input>
                        <label>Female</label><br />

                        {tooglebtn ? <button className='Submitbtn' onClick={addData}>Submit</button> :
                            <button className='Submitbtn' onClick={addData}>Edit</button>}

                    </div>
                </div>


                <div className='detailsform'>

                    {data.length > 0 ? <>
                        <table>
                            <thead>
                                <tr>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>E-Mail</th>
                                    <th>Education</th>
                                    <th>Birth Of Date </th>
                                    <th>Gender </th>
                                    <th>Delete  </th>
                                    <th>Update</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(data => {
                                    return (

                                        <tr key={data.id}>
                                            <td>{data.firstname}</td>
                                            <td>{data.lastname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.education}</td>
                                            <td>{data.bod}</td>
                                            <td>{data.gender}</td>

                                            <td><svg xmlns="http://www.w3.org/2000/svg" onClick={() => deleteData(data.id)} width="20" height="20" fill="currentColor" className="deletbtn" viewBox="0 0 16 16" >
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg></td>

                                            <td><svg xmlns="http://www.w3.org/2000/svg" onClick={() => updateData(data.id)} width="16" height="16" fill="currentColor" className="updatetbtn" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                            </svg></td>
                                        </tr>

                                    )
                                })}
                            </tbody>

                        </table>
                    </>
                        : data.length < 1 && <div><h1 className='notice'>Pls Insert Data First</h1></div>}


                </div>

            </form>
        </>
    )
}
