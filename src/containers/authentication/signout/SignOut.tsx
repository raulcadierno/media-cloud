import React, { useState } from 'react';
import { logOutOutline } from 'ionicons/icons';
import './SignOut.css';
import { IonItem, IonIcon, IonAlert, IonLabel } from '@ionic/react';

interface props {
    handleSignOut: () => void
}

const SignOut: React.FC<props> = props => {

    const [showAlert, setShowAlert] = useState(false);

    return (
        <React.Fragment>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass="my-custom-class"
                header={"¿Quieres cerrar sesión?"}
                buttons={["No",
                    {
                    text: "Si",
                    role: "accept",
                    handler: () => {
                       props.handleSignOut();
                    },
                    },
                ]}
            />
            <IonItem button onClick={() => setShowAlert(true)}>
                <IonIcon className="ion-icon-red" slot="start" icon={logOutOutline}/>
                <IonLabel color="danger">Cerrar Sesion</IonLabel>
            </IonItem> 
        </React.Fragment>
         
    );
}
 
export default SignOut;