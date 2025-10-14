import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const GOLD = '#bfa23a';
const NOTIF_BG = '#222';
const DARK_BG = '#111';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${DARK_BG};
  color: #fff;
  font-family: 'Satoshi', sans-serif;
  padding: 2rem 0;
`;

const Card = styled.div`
  background: ${NOTIF_BG};
  border-radius: 16px;
  max-width: 540px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22);
  border: 2px solid ${GOLD};
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${GOLD};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #333;
  background: ${props => props.read ? '#191919' : '#222'};
  border-radius: 10px;
  margin-bottom: 0.7rem;
  box-shadow: ${props => props.read ? 'none' : '0 2px 12px rgba(191,162,58,0.08)'};
  cursor: pointer;
  transition: background 0.2s;
`;

const Message = styled.div`
  font-weight: ${props => props.read ? 400 : 700};
  color: ${props => props.color};
  flex: 1;
`;

const DateText = styled.div`
  font-size: 0.95rem;
  color: #aaa;
  margin-left: 12px;
  min-width: 110px;
  text-align: right;
`;

export default function NotificationsPage() {
  const { user } = useUser();
  const userId = user?.id;
  const notifications = useQuery(api.notifications.getForUser, userId ? { userId } : { userId: "" });
  const markRead = useMutation(api.notifications.markRead);

  useEffect(() => {
    document.title = "Notifications | Admin";
  }, []);

  return (
    <PageContainer>
      <Card>
        <Title>All Notifications</Title>
        {notifications && notifications.length > 0 ? (
          notifications
            .sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1))
            .map((notif) => {
              let icon, color;
              if (notif.type === 'success') {
                icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="#bfa23a" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#bfa23a"/><path d="M8 12l2 2 4-4" stroke="#bfa23a"/></svg>;
                color = '#bfa23a';
              } else if (notif.type === 'warning') {
                icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="#e67e22" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#e67e22"/><path d="M12 8v4m0 4h.01" stroke="#e67e22"/></svg>;
                color = '#e67e22';
              } else if (notif.type === 'info') {
                icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="#3498db" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3498db"/><path d="M12 16v-4m0-4h.01" stroke="#3498db"/></svg>;
                color = '#3498db';
              } else {
                icon = <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff"/></svg>;
                color = '#fff';
              }
              return (
                <NotificationItem key={notif._id} read={notif.read} onClick={async () => { if (!notif.read) await markRead({ id: notif._id }); }}>
                  {icon}
                  <Message read={notif.read} color={color}>{notif.message}</Message>
                  <DateText>{new Date(notif.createdAt).toLocaleString()}</DateText>
                </NotificationItem>
              );
            })
        ) : (
          <div style={{ color: '#ccc', fontSize: '1.08rem', padding: '1.2rem 0', textAlign: 'center' }}>No notifications found.</div>
        )}
      </Card>
    </PageContainer>
  );
}
