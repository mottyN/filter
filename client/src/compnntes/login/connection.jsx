import React, { useEffect, useState } from "react";

export function Connection(props) {
  const [byt, setbut] = useState([])

  useEffect(() => {
    let items = [];

    if (props.obj.admin) {
      items.push(<button style={{height : 'auto', backgroundColor :'white', color : 'black', margin : '10px', }} onClick={ () => window.location.href = "/main?table=cards"}  key="admin">מנהל</button>);
    }
    if (props.obj.stores) {
      items.push(<p key="stores-title">חנויות</p>);
      props.obj.stores.map((store, index) => {
        items.push(<div><button style={{height : 'auto', backgroundColor :'white', color : 'black', margin : '10px', }} onClick={ () => window.location.href = `/stor/${store.id}?table=cards`} key={`store-${index}`}>{store.name}</button> </div>);
      });
    }
    if (props.obj.storeManage) {
      items.push(<p key="stores-title">ניהול חנויות</p>);
      props.obj.storeManage.map((store, index) => {
        items.push(<div><button style={{height : 'auto', backgroundColor :'white', color : 'black', margin : '10px', }} onClick={ () => window.location.href = `/stor/${store.id}?table=cards`} key={`store-${index}`}>{store.name}</button> </div>);
      });
    }
    if (props.obj.clubs) {
      items.push(<p key="clubs-title">מועדונים</p>);
      props.obj.clubs.map((club, index) => {
        items.push(<div><button style={{height : 'auto', backgroundColor :'white', color : 'black', margin : '10px', }} onClick={ () => window.location.href = `/clubs/${club.id}`} key={`club-${index}`}>{club.name}</button> </div>);
      });
    }
    setbut(items)
  }, [props.obj.admin, props.obj.stores, props.obj.clubs]);

//   console.log(items);
  
  return (
    <div style={{border : '1px black solid', textAlign : 'center'}}>
    <h2> אפשרויות כניסה </h2>
      {byt}
    </div>
  );
}
