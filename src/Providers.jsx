import { CurrentUserProvider } from './contexts/CurrentUserContext.jsx';
import { LocationsProvider } from './contexts/LocationsContext.jsx';
import { ProfileProvider } from './contexts/ProfileContext.jsx';
import { ModalProvider } from './contexts/ReviewModalContext.jsx';
import { ReviewsProvider } from './contexts/ReviewsContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';

const Providers = ({ children }) => {
    return (
      <CurrentUserProvider>
        <ToastProvider>
          <ProfileProvider>
            <ReviewsProvider>
              <LocationsProvider>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </LocationsProvider>
            </ReviewsProvider>
          </ProfileProvider>
        </ToastProvider>
      </CurrentUserProvider>
    );
  };

export default Providers;