import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ModalProvider } from "./contexts/ReviewModalContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { LocationsProvider } from "./contexts/LocationsContext";
import { ReviewsProvider } from "./contexts/ReviewsContext";
import { ToastProvider } from "./contexts/ToastContext";

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