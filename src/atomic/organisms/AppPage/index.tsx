import {
  IonContent,
  IonLoading,
  IonPage
} from '@ionic/react'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  max-width: 1480px;
  width: 100%;
`

export interface IAppPageProps {
  loading?: boolean
  onDidDismiss?: () => void
}

export const AppPage: React.FC<IAppPageProps> = ({
  loading,
  onDidDismiss,
  children
}): JSX.Element => {
  return (
    <IonPage>
      <IonContent class='scroll-content'>
        {loading && (
          <IonLoading
            isOpen={loading}
            onDidDismiss={onDidDismiss}
            message='Carregando'
          />
        )}
        <Container>
          <Content>{children}</Content>
        </Container>
      </IonContent>
    </IonPage>
  )
}