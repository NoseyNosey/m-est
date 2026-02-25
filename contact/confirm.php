<?php
// POSTリクエストかどうかを確認
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. データの受け取りとエスケープ（クロスサイトスクリプティング対策）
    $inquiry_type = htmlspecialchars($_POST['inquiry_type'] ?? '', ENT_QUOTES, 'UTF-8');
    $company      = htmlspecialchars($_POST['company'] ?? '', ENT_QUOTES, 'UTF-8');
    $last_name    = htmlspecialchars($_POST['last_name'] ?? '', ENT_QUOTES, 'UTF-8');
    $first_name   = htmlspecialchars($_POST['first_name'] ?? '', ENT_QUOTES, 'UTF-8');
    $last_kana    = htmlspecialchars($_POST['last_kana'] ?? '', ENT_QUOTES, 'UTF-8');
    $first_kana   = htmlspecialchars($_POST['first_kana'] ?? '', ENT_QUOTES, 'UTF-8');
    $email        = htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8');
    $tel          = htmlspecialchars($_POST['tel'] ?? '', ENT_QUOTES, 'UTF-8');
    $message      = htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8');

    // --------------------------------------------------
    // 2. メール送信の基本設定
    // --------------------------------------------------
    $admin_email  = "info@m-est.jp";         // 管理者（あなた）のメールアドレス
    $company_name = "株式会社エムエスト";       // 会社名
    $site_url     = "https://m-est.jp";      // サイトのURL

    // 日本語メールを送るための設定
    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    // --------------------------------------------------
    // 3. 管理者宛（エムエスト様宛）の通知メール設定
    // --------------------------------------------------
    $admin_subject = "【Webサイトより】お問い合わせがありました";
    
    $admin_body  = "Webサイトのフォームからお問い合わせがありました。\n\n";
    $admin_body .= "■ お問い合わせ内容\n";
    $admin_body .= "【項目】 {$inquiry_type}\n";
    $admin_body .= "【法人名】 {$company}\n";
    $admin_body .= "【お名前】 {$last_name} {$first_name}（{$last_kana} {$first_kana}）\n";
    $admin_body .= "【メールアドレス】 {$email}\n";
    $admin_body .= "【電話番号】 {$tel}\n";
    $admin_body .= "【内容】\n{$message}\n";

    // From: info@m-est.jp / Reply-To: お客様のメールアドレス
    $admin_headers  = "From: {$admin_email}\r\n";
    $admin_headers .= "Reply-To: {$email}\r\n";

    // --------------------------------------------------
    // 4. お客様宛（送信者宛）の自動返信メール設定
    // --------------------------------------------------
    $user_subject = "【{$company_name}】お問い合わせありがとうございます（自動返信）";
    
    $user_body  = "{$last_name} {$first_name} 様\n\n";
    $user_body .= "この度は {$company_name} にお問い合わせいただき、誠にありがとうございます。\n";
    $user_body .= "以下の内容でお問い合わせを受け付けいたしました。\n\n";
    
    $user_body .= "内容を確認の上、担当者より改めてご連絡させていただきます。\n";
    $user_body .= "今しばらくお待ちくださいますようお願い申し上げます。\n\n";
    
    $user_body .= "--------------------------------------------------\n";
    $user_body .= "【項目】 {$inquiry_type}\n";
    $user_body .= "【法人名】 {$company}\n";
    $user_body .= "【お名前】 {$last_name} {$first_name}\n";
    $user_body .= "【メールアドレス】 {$email}\n";
    $user_body .= "【電話番号】 {$tel}\n";
    $user_body .= "【内容】\n{$message}\n";
    $user_body .= "--------------------------------------------------\n\n";
    
    $user_body .= "※本メールは自動配信されています。\n";
    $user_body .= "※お心当たりのない場合は、お手数ですが本メールを破棄していただきますようお願いいたします。\n\n";
    
    $user_body .= "--------------------------------------------------\n";
    $user_body .= "{$company_name}\n";
    $user_body .= "URL: {$site_url}\n";
    $user_body .= "Email: {$admin_email}\n";
    $user_body .= "--------------------------------------------------\n";

    // From: info@m-est.jp
    $user_headers = "From: {$admin_email}\r\n";

    // --------------------------------------------------
    // 5. メールの送信実行
    // --------------------------------------------------
    $admin_sent = mb_send_mail($admin_email, $admin_subject, $admin_body, $admin_headers);
    $user_sent  = mb_send_mail($email, $user_subject, $user_body, $user_headers);

    // 両方の送信が成功したか判定
    if ($admin_sent && $user_sent) {
        // 送信成功時の処理
        echo "お問い合わせありがとうございました。ご入力いただいたメールアドレス宛に確認メールを送信いたしました。";
        
        // 実務では以下のコメントアウトを外し、サンクスページ（thanks.htmlなど）へリダイレクトさせます
        // header("Location: thanks.html");
        // exit;
    } else {
        // 送信失敗時の処理
        echo "申し訳ございません。メールの送信に失敗しました。時間をおいて再度お試しいただくか、直接 {$admin_email} までご連絡ください。";
    }

} else {
    echo "不正なアクセスです。";
}
?>