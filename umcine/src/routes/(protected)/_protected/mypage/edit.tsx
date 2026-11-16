import { createFileRoute } from '@tanstack/react-router'
import { EditProfilePage } from '../../../../pages/mypage/edit-profile-page'

export const Route = createFileRoute('/(protected)/_protected/mypage/edit')({
  component: EditProfilePage,
})

