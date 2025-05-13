import Swal from "sweetalert2";

// 높은 z-index를 가진 SweetAlert 기본 설정
const SwalWithHighZIndex = Swal.mixin({
  customClass: {
    container: "swal-high-z-index", // 이 클래스는 CSS에서 높은 z-index를 가집니다
  },
  // z-index를 9999로 설정하여 다른 모달보다 앞에 표시되도록 함
  // backdrop은 배경으로 10000보다 1 작은 값을 사용
  backdrop: `rgba(0,0,0,0.4)`,
  allowOutsideClick: false, // 모달 외부 클릭 방지
  didOpen: (toast) => {
    // 모달이 열릴 때 z-index 직접 설정
    const containerEl = Swal.getContainer();
    if (containerEl) {
      containerEl.style.zIndex = "10000";
    }
  },
});

// 기본 알림 함수 (기존 alert 대체)
export const showAlert = (message: string, title: string = "") => {
  return SwalWithHighZIndex.fire({
    title: title,
    text: message,
    icon: "info",
    confirmButtonText: "확인",
    confirmButtonColor: "#3085d6",
  });
};

// 성공 알림 함수
export const showSuccess = (message: string, title: string = "성공!") => {
  return SwalWithHighZIndex.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonText: "확인",
    confirmButtonColor: "#3085d6",
  });
};

// 에러 알림 함수
export const showError = (message: string, title: string = "오류") => {
  return SwalWithHighZIndex.fire({
    title: title,
    text: message,
    icon: "error",
    confirmButtonText: "확인",
    confirmButtonColor: "#3085d6",
  });
};

// 경고 알림 함수
export const showWarning = (message: string, title: string = "주의") => {
  return SwalWithHighZIndex.fire({
    title: title,
    text: message,
    icon: "warning",
    confirmButtonText: "확인",
    confirmButtonColor: "#3085d6",
  });
};

// 확인 함수 (기존 confirm 대체)
export const showConfirm = (message: string, title: string = "확인") => {
  return SwalWithHighZIndex.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};
