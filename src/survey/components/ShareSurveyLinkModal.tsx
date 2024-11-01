import { Card, Divider, Input, Button } from "@nextui-org/react";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { environmentUrl } from "../../shared/services/GlobalAPI.ts";
import toImg from 'react-svg-to-image';
import { toast, ToastContainer } from "react-toastify";

export function ShareSurveyLinkModal({ surveyId, onClose }) {
    const shareableLink = `${environmentUrl}/public-survey/${surveyId}`;
    const [isCopied, setIsCopied] = useState(false);
    const qrCodeRef = useRef(null);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast("Copied to clipboard", { type: "success" });
    };

    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            toImg(qrCodeRef.current, {
                name: `survey-${surveyId}-qrcode`,
                download: true,
            })
                .then(() => {
                    toast("Your QR code has been downloaded", { type: "success" });
                })
                .catch((error) => {
                    toast(`Error downloading QR code: ${error.message}`, { type: "error" });
                });
        } else {
            toast("QR code element not found", { type: "error" });
        }
    };


    return (
        <>
            <ToastContainer />
            <Card className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Share your survey</h2>
                <div className="flex justify-center mb-4">
                        <div ref={qrCodeRef}>
                        <QRCodeCanvas
                            id="survey-qr-code"
                            value={shareableLink}
                            size={150}
                        />
                    </div>
                </div>
                <p className="text-gray-500 text-sm mb-4 cursor-pointer" onClick={downloadQRCode}>
                    Click to download QR code as image
                </p>
                <Divider className="my-4" />
                <Input
                    className="w-full mb-4"
                    value={shareableLink}
                    endContent={
                        <i className="pi pi-copy cursor-pointer" onClick={handleCopyLink} />
                    }
                />
                {isCopied && <p className="text-green-500 text-sm">Link copied to clipboard!</p>}
                <Button className="mt-4 w-full" color="primary" onPress={onClose}>
                    Close window
                </Button>
            </Card>
        </>
    );
}
