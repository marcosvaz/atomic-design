import { IonButton } from '@ionic/react'
import React from 'react'

export interface IButtonProps {
  onClick?: () => void
  children?: string
  disabled?: boolean
}

export const Button: React.FC<IButtonProps> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <IonButton {...props} expand='full'>
      {children}
    </IonButton>
  )
}