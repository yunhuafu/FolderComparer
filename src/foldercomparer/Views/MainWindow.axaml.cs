using Avalonia.Controls;
using Avalonia.Interactivity;
using System.Threading.Tasks;

namespace foldercomparer.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public async void SelectFolder1(object? sender, RoutedEventArgs e)
    {
        var dialog = new OpenFolderDialog
        {
            Title = "Choose a folder",
        };

        var result = await dialog.ShowAsync(this);

        if (result is { Length: > 0 })
        {
            folder1TextBox.Text = result; // Update UI with selected file path
        }
    }

    public async void SelectFolder2(object? sender, RoutedEventArgs e)
    {
        var dialog = new OpenFolderDialog
        {
            Title = "Choose a folder",
        };

        var result = await dialog.ShowAsync(this);

        if (result is { Length: > 0 })
        {
            folder2TextBox.Text = result; // Update UI with selected file path
        }
    }
}