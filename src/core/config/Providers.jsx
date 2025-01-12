import { CurrentUserProvider } from '../../features/auth/context/CurrentUserContext.jsx';
import { LocationsProvider } from '../../features/locations/context/LocationsContext.jsx';
import { ProfileProvider } from '../../features/profile/context/ProfileContext.jsx';
import { ModalProvider } from '../../features/reviews/context/ReviewModalContext.jsx';
import { ReviewsProvider } from '../../features/reviews/context/ReviewsContext.jsx';
import { ToastProvider } from '../../shared/contexts/ToastContext.jsx';

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