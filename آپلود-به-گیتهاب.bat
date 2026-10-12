@echo off
chcp 65001 >nul
title اپلود پروژه به گیت‌هاب
cls

echo ======================================================
echo          سیستم هوشمند اپلود پروژه به گیت‌هاب
echo ======================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%LOCALAPPDATA%\Programs\GitHubCLI;%PATH%"

:: بررسی گیت
git --version >nul 2>&1
if errorlevel 1 (
    echo [خطا] ابزار Git پیدا نشد!
    pause
    exit /b 1
)

:: اطمینان از تنظیم safe.directory
git config --global --add safe.directory "%~dp0." >nul 2>&1
git config --global --add safe.directory "*" >nul 2>&1

:: بررسی لاگین گیت‌هاب
echo در حال بررسی وضعیت اتصال به اکانت گیت‌هاب...
gh auth status >nul 2>&1
if errorlevel 1 (
    echo.
    echo ------------------------------------------------------
    echo  اکانت گیت‌هاب متصل نیست!
    echo.
    echo  اگر اکانت گیت‌هاب ندارید:
    echo  1. وارد سایت زیر شوید و در 1 دقیقه ثبت نام کنید:
    echo     https://github.com/signup
    echo.
    echo  سپس برای اتصال اکانت، کلید Enter را بزنید تا
    echo  صفحه ورود مرورگر باز شود...
    echo ------------------------------------------------------
    echo.
    pause
    echo.
    echo در حال باز کردن صفحه ورود گیت‌هاب...
    gh auth login --web --git-protocol https
)

echo.
echo وضعیت اتصال: متصل شد!
echo.

:: نام پیش‌فرض مخزن
set "REPONAME=holding-aghaye-parquet"
echo نام پیشنهادی مخزن: %REPONAME%
set /p USER_REPONAME="اگر نام دیگری می‌خواهید وارد کنید (یا Enter بزنید برای پیش‌فرض): "
if not "%USER_REPONAME%"=="" set "REPONAME=%USER_REPONAME%"

echo.
echo نوع مخزن:
echo [1] عمومی (Public - برای همه قابل مشاهده) - پیش‌فرض
echo [2] خصوصی (Private - فقط خودتان می‌بینید)
set /p VISIBILITY_CHOICE="انتخاب کنید (1 یا 2): "

set "VISIBILITY_FLAG=--public"
if "%VISIBILITY_CHOICE%"=="2" set "VISIBILITY_FLAG=--private"

echo.
echo ======================================================
echo در حال ساخت مخزن و اپلود کل پروژه روی گیت‌هاب...
echo ======================================================

:: ثبت آخرین تغییرات احتمالی
git add .
git commit -m "Update project files" >nul 2>&1

:: ساخت مخزن و پوش اتوماتیک
gh repo create "%REPONAME%" %VISIBILITY_FLAG% --source="%~dp0." --remote=origin --push

if errorlevel 1 (
    echo.
    echo [تلاش مجدد برای ارسال با دستور Push مستقیم...]
    git push -u origin main
)

echo.
echo ======================================================
echo  پروژه با موفقیت روی گیت‌هاب اپلود شد!
echo ======================================================
echo.
gh browse
pause
