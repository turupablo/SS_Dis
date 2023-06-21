/* eslint-disable react-native/no-inline-styles */
import { TopNavigation, TopNavigationAction, Icon, Button, Text, Modal, Card } from '@ui-kitten/components';
import * as React from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { CinemaFormDetails } from './CinemaFormDetails';
import { CinemaFormAddress } from './CinemaFormAddress';
import CinemaFormSummary from './CinemaFormSummary';
import { useDispatch } from 'react-redux';
import { reset } from '../../../../redux/slices/formSlice';
import I18n from '../../../../assets/strings/I18n';
import TEXT_KEY from '../../../../assets/strings/TextKey';

const PAGES = ['Page 1', 'Page 2', 'Page 3'];

const thirdIndicatorStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 15,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#1677ff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1677ff',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#1677ff',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#1677ff',
  stepIndicatorUnFinishedColor: '#dedede',
  stepIndicatorCurrentColor: '#1677ff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#999999',
};

const BackIcon = (props) => (
  <Icon {...props} name="arrow-back" />
);

export const CinemaForm = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  const navigateBack = () => {
    navigation.goBack();
    dispatch(reset())
  };

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  const stepLabels = [
    { label: I18n.t(TEXT_KEY.cinemaForm.stepIndicator.firstStep) },
    { label: I18n.t(TEXT_KEY.cinemaForm.stepIndicator.secondStep) },
    { label: I18n.t(TEXT_KEY.cinemaForm.stepIndicator.thirdStep) },
  ];
   
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', height: '100%' }}>
      <TopNavigation title="ScreenSpace" alignment="center" accessoryLeft={BackAction} style={{height: '8%' }}/>
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            stepCount={3}
            customStyles={thirdIndicatorStyles}
            currentPosition={currentPage}
            onPress={onStepPress}
            labels={stepLabels.map((step) => step.label)}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
              {currentPage === 0 && <CinemaFormDetails/>}
              {currentPage === 1 && <CinemaFormAddress/>}
              {currentPage === 2 && <CinemaFormSummary header={I18n.t(TEXT_KEY.cinemaSummary.formTitle)}/>}
          </View>
          <View style={[{justifyContent: currentPage === 0 ? 'center' : 'space-around'}, styles.actionLayout]}>
            {currentPage !== 0 && (
            <Button style={styles.buttonStyle} onPress={() => setCurrentPage(currentPage - 1)}>
                {I18n.t(TEXT_KEY.cinemaForm.buttonPreviousText)}
            </Button>
            )}
            {currentPage !== PAGES.length - 1 ? (
              <Button style={currentPage === 0 ? styles.oneButton : styles.buttonStyle} onPress={() => setCurrentPage(currentPage + 1)}>
                {I18n.t(TEXT_KEY.cinemaForm.buttonNextText)}
              </Button>
            ) : (
              <Button status="success" style={currentPage === 0 ? styles.oneButton : styles.buttonStyle} onPress={() => {
                dispatch(reset());
                setVisible(true);
                }}>
                {I18n.t(TEXT_KEY.cinemaForm.buttonFinishText)}
              </Button>
            )}
          </View>
        </View>
      </View>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{width: '80%', alignSelf: 'center'}}>
          <Text style={{marginBottom: 10, textAlign: 'center'}}>
            Your cinema was created successfully
          </Text>
          <Button status="success" onPress={() => {
            setVisible(false);
            navigateHome();
            }}>
            Home
          </Button>
        </Card>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '92%',
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    height: '90%',
  },
  stepIndicator: {
    top: '2%',
    height: '10%',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
  actionLayout: {
    display:'flex',
    alignSelf: 'center',
    flexDirection:'row',
    alignItems: 'center',
    height: '14%',
    width: '90%',
  },
  buttonStyle: {
    borderRadius: 1000,
    width: 140,
  },
  formContainer: {
    height: '86%',
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  oneButton: {
    borderRadius: 1000,
    width: 300,
  },
  scrollContainer: {
    backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
