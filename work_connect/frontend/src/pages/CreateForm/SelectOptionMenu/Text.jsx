import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Divider from "@mui/material/Divider";


// 親コンポーネントからのプロップスで設定内容を受け取れるようにする
export default function Text({ onSave }) {
    const [title, setTitle] = useState("");
    const [maxLength, setMaxLength] = useState("");
    const [minLength, setMinLength] = useState("");
    const [selectedType, setSelectedType] = useState(null); // 選択されたオプションを保持する状態
    const [placeholder, setPlaceholder] = useState("");
    const [autocomplete, setAutoComplete] = useState(false); // 自動補完の状態管理を boolean に修正
    const [isrequired, setisrequired] = useState(false); // 自動補完の状態管理を boolean に修正
    const [description, setDescription] = useState(""); // 自動補完の状態管理を boolean に修正\
    const [validatorsminlength, setValidatorsMinLength] = useState("10"); // 自動補完の状態管理を boolean に修正\
    const [validatorsmaxlength, setValidatorsMaxLength] = useState("20"); // 自動補完の状態管理を boolean に修正\
    const [validatorstext, setValidatorstext] = useState("パスワードは5文字以上です");



    // 保存ボタンがクリックされた時にデータを親コンポーネントに渡す
    const handleSave = () => {
        let complete;
        if (autocomplete) {
            complete = selectedType?.name;
        }

        // バリデーターを設定
        const validators = [];
        if (validatorsminlength || validatorsmaxlength || validatorstext) {
            validators.push({
                type: 'text', // 'text' など、適切なバリデーターの種類
                maxLength: maxLength ? parseInt(validatorsminlength, 10) : undefined,
                minLength: minLength ? parseInt(validatorsmaxlength, 10) : undefined,
                text: validatorstext || ""
            });
        }

        const settings = {
            title: title || "新しい質問",
            inputType: selectedType ? selectedType.name : "username",
            maxLength: maxLength ? parseInt(maxLength, 10) : undefined,
            minLength: minLength ? parseInt(minLength, 10) : undefined,
            placeholder: placeholder || "",
            autocomplete: complete || "",
            isRequired: isrequired || false,
            description: description || "",
            validators: validators
        };

        onSave(settings); // 親コンポーネントに設定を渡す
        console.log("設定", settings);
    };


    const inputtype = [
        { label: 'テキスト', id: 1, name: "username" },
        { label: 'メールアドレス', id: 2, name: "email" },
        { label: 'パスワード', id: 3, name: "password" },
        { label: 'URL', id: 4, name: "url" },
    ];

    return (
        <div className="TextSetting">
            <Stack spacing={2}>
                <Typography variant="h6">テキストフォーム設定</Typography>

                <Autocomplete
                    disablePortal
                    options={inputtype}
                    value={selectedType} // 選択された値を表示
                    onChange={(event, newValue) => setSelectedType(newValue)} // 値が変わったときに状態を更新
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="種類" />}
                />

                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />


                {/* selectedType.name が "email" の場合に表示する */}
                {selectedType?.name === "email" && (
                    <div>
                        <TextField
                            label="最大文字数"
                            value={maxLength}
                            onChange={(e) => setMaxLength(e.target.value)}
                            type="number"
                            fullWidth
                        />

                        <TextField
                            label="最小文字数"
                            value={minLength}
                            onChange={(e) => setMinLength(e.target.value)}
                            type="number"
                            fullWidth
                        />

                        <TextField
                            label="プレースホルダー"
                            value={placeholder}
                            placeholder="foobar@example.com"
                            onChange={(e) => setPlaceholder(e.target.value)}
                            type="text"
                            fullWidth
                        />

                        <div>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Checkbox
                                    checked={autocomplete}
                                    onChange={(e) => setAutoComplete(e.target.checked)} // Checkboxの状態を更新
                                />
                                <Typography>入力する文字を予測する</Typography>
                            </Stack>
                        </div>
                        <div>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Checkbox
                                    checked={isrequired}
                                    onChange={(e) => setisrequired(e.target.checked)} // Checkboxの状態を更新
                                />
                                <Typography>入力した文字をチェックする</Typography>
                            </Stack>
                        </div>
                    </div>
                )}

                {selectedType?.name === "password" && (
                    <div>
                        <TextField
                            label="パスワード制約の説明"
                            value={description}
                            placeholder="例:10文字以内で入力してください"
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            fullWidth
                        />
                        <div>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Checkbox
                                    checked={autocomplete}
                                    onChange={(e) => setAutoComplete(e.target.checked)} // Checkboxの状態を更新
                                />
                                <Typography>入力する文字を予測する</Typography>
                            </Stack>
                        </div>
                        <div>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Checkbox
                                    checked={isrequired}
                                    onChange={(e) => setisrequired(e.target.checked)} // Checkboxの状態を更新
                                />
                                <Typography>入力した文字をチェックする</Typography>
                            </Stack>
                        </div>
                        <Divider color="black" sx={{ borderStyle: 'dashed', display: 'block' }} />
                        <p>エラーチェック</p>
                        <div>
                        <TextField
                            label="最大文字数"
                            value={maxLength}
                            onChange={(e) => setValidatorsMaxLength(e.target.value)}
                            type="number"
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                        />
                        </div>
                        <div>
                            <TextField
                                label="最小文字数"
                                value={minLength}
                                onChange={(e) => setValidatorsMinLength(e.target.value)}
                                type="number"
                                fullWidth
                                sx={{ marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <TextField
                                label="エラー時の警告メッセージ"
                                value={minLength}
                                onChange={(e) => setValidatorstext(e.target.value)}
                                type="text"
                                fullWidth
                                sx={{ marginBottom: '10px' }}
                            />
                        </div>
                        <Divider color="black" sx={{borderStyle: 'dashed', marginBottom: '10px', display: 'block' }} />
                    </div>

                )}

                <Button variant="contained" color="primary" onClick={handleSave}>
                    保存
                </Button>
            </Stack>
        </div>
    );
}

// PropTypesバリデーション
Text.propTypes = {
    onSave: PropTypes.func.isRequired,
};
