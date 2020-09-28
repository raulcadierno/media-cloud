import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import "./Home.scss";
import Toolbar from "../../components/ToolBar/Toolbar";
import LoadRecents from "../../components/LoadRecents/LoadRecents";
import LoadMyFiles from "../../components/LoadMyFiles/LoadMyFiles";

const Home: React.FC = () => {

  //Inicializamos en el segmento por defecto
  const [ currentSegment, setCurrentSegment ] = useState<string | undefined>("recents");

  return (
    <IonPage>
      <Toolbar />
      <IonContent className="my-custom-content">
        <IonSegment className="my-segments" value={currentSegment} onIonChange={e => setCurrentSegment(e.detail.value)}>
          <IonSegmentButton className="my-custom-segment-button" value="recents">
            <IonLabel>Recientes</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton className="my-custom-segment-button" value="my-files">
            <IonLabel>Mis archivos</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {
          currentSegment === "recents" 
          ? <LoadRecents maxFiles={10} />
          : <LoadMyFiles />
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
