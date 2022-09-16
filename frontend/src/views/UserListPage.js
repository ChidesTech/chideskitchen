import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../components/Popup";
import { LinearProgress } from "@material-ui/core";
import { deleteUser, listUsers } from "../redux-actions/userActions";
import { USER_DELETE_RESET, USER_DETAILS_RESET } from "../redux-constants/userConstants";
import Swal from "sweetalert2";

const UserListPage = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;
    const userDelete = useSelector(state=>state.userDelete);
    const { error :errorDelete, success: successDelete}= userDelete;
    if(!userInfo){
        props.history.push("/login");
    }
    const dispatch = useDispatch();
    let sn = 0;
useEffect(()=>{
    if(successDelete){
           
        dispatch({type: USER_DELETE_RESET});
    }
    dispatch(listUsers());
    dispatch({type:USER_DETAILS_RESET})
},[dispatch, successDelete]);

const deleteHandler=(userId)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {

            dispatch(deleteUser(userId))



        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'User Not Deleted',
                'error'
            )
        }
    })

  
   
}
    return (<div className="order-tbl">
      <h1 style={{textAlign:"center",color:"orangered",textShadow:"1px 1px 1px black", fontSize:"2.2rem"}}>Users</h1>
      {errorDelete && <Popup variant="danger">{errorDelete}</Popup> }
       {loading ?  <LinearProgress
      style={{margin:"10% 30%",height:"2rem"}}
     
    />  :
       error ? <Popup variant="danger">{error}</Popup> :
    
       
       (
       
           <table>
               {users.length===0? <Popup>No User.</Popup>:(
<>
<thead>
        <tr style={{background:"white",textShadow:"1px 1px 1px black",color:"orangered"}}>
            <th>S.N</th>
            <th>Username</th>
             <th>Email</th>
             <th>Admin</th>
             <th>Super Admin</th>
             <th>Action</th>
        </tr>
        </thead>
        <tbody>
            
        {users.map((user)=>{
             
            return(
            <tr  key={user._id}>
                <td>{sn+=1}.</td>
                 
                <td >{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin === false ? "No" :"Yes"}</td>
                <td>{user.isSuper === false ? "No" :"Yes"}</td>
              
                <td><button style={{backgroundColor:"orangered",marginRight:"1rem",cursor:"pointer", color:"white"}} type="button" className="btn-small"

                onClick={()=>{props.history.push(`/user/${user._id}/edit`)}}
                ><i className="fa fa-lg fa-edit"></i></button>
                
                <button type="button" style={{ cursor:"pointer", background:"red"}} className="btn-small"
                onClick={()=>deleteHandler(user._id)}
                ><i className="fa fa-trash-alt fa-lg"></i></button></td>
            </tr>
        )}

        )}</tbody>
               
</>


)}
              
           </table>
       )}
    </div>
    )

}
    ;

export default UserListPage;